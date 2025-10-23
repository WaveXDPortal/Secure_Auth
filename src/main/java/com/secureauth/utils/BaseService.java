package com.secureauth.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.secureauth.exceptions.ApiRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;

import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManagerFactory;
import java.io.InputStream;
import java.net.URI;
import java.net.URL;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.KeyStore;
import java.util.Map;
public class BaseService {
    protected static final Logger logger = LoggerFactory.getLogger(BaseService.class);
    protected final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${app.environment.key.store.password}")
    private String KEY_STORE_PASSWORD;

    /**
     * Creates an SSL Context for secure HTTP requests.
     */
    protected SSLContext createSSL() {
        logger.info("Initializing SSL Context...");
        try {
            // Load the keystore resource
            URL res = getClass().getClassLoader().getResource("keystore.jks");
            if (res == null) {
                logger.error("Keystore file 'keystore.jks' not found in the classpath!");
                throw new ApiRequestException("Keystore file 'keystore.jks' not found in the classpath.");
            }

            // Load TrustStore from keystore
            KeyStore trustStore = loadKeyStore(res, "TrustStore");

            // Initialize TrustManagerFactory with TrustStore
            TrustManagerFactory trustManagerFactory = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
            try {
                trustManagerFactory.init(trustStore);
            } catch (Exception e) {
                logger.error("Failed to initialize TrustManagerFactory with TrustStore", e);
                throw new ApiRequestException("Error initializing TrustManagerFactory with TrustStore.", e);
            }

            // Load Identity KeyStore
            KeyStore identity = loadKeyStore(res, "Identity");

            // Initialize KeyManagerFactory with Identity KeyStore
            KeyManagerFactory keyManagerFactory = KeyManagerFactory.getInstance(KeyManagerFactory.getDefaultAlgorithm());
            try {
                keyManagerFactory.init(identity, KEY_STORE_PASSWORD.toCharArray());
            } catch (Exception e) {
                logger.error("Failed to initialize KeyManagerFactory with Identity KeyStore", e);
                throw new ApiRequestException("Error initializing KeyManagerFactory with Identity KeyStore.", e);
            }

            // Create and initialize SSLContext
            SSLContext sslContext = SSLContext.getInstance("SSL");
            try {
                sslContext.init(keyManagerFactory.getKeyManagers(), trustManagerFactory.getTrustManagers(), null);
            } catch (Exception e) {
                logger.error("Failed to initialize SSLContext", e);
                throw new ApiRequestException("Error initializing SSLContext.", e);
            }

            return sslContext;

        } catch (Exception ex) {
            logger.error("Error creating SSL context", ex);
            throw new ApiRequestException("Failed to create SSL context", ex);
        }
    }

    private KeyStore loadKeyStore(URL keystoreUrl, String type) throws Exception {
        try (InputStream keystoreStream = Files.newInputStream(Paths.get(keystoreUrl.toURI()))) {
            KeyStore keystore = KeyStore.getInstance(KeyStore.getDefaultType());
            keystore.load(keystoreStream, KEY_STORE_PASSWORD.toCharArray());
            logger.info("{} KeyStore loaded successfully", type);
            return keystore;
        } catch (Exception e) {
            logger.error("Failed to load {} KeyStore from file: {}", type, keystoreUrl, e);
            throw new ApiRequestException("Error loading " + type + " KeyStore from file: " + keystoreUrl, e);
        }
    }


    /**
     * Creates an HTTP client with SSL support.
     */
    protected HttpClient createHttpClient(SSLContext sslContext) {
        return HttpClient.newBuilder().sslContext(sslContext).build();
    }

    /**
     * Sends an HTTP request and returns the response.
     */
    protected HttpResponse<String> sendHttpRequest(HttpRequest request, HttpClient httpClient) {
        try {
            return httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        } catch (java.net.http.HttpTimeoutException e) {
            logger.error("Request timeout: {}", request.uri(), e);
            throw new ApiRequestException("Request timed out for URL: " + request.uri(), e);
        } catch (java.net.UnknownHostException e) {
            logger.error("Unknown host: {}", request.uri(), e);
            throw new ApiRequestException("Unknown host: " + request.uri(), e);
        } catch (java.io.IOException e) {
            logger.error("I/O error while calling: {}", request.uri(), e);
            throw new ApiRequestException("I/O error occurred while making request to: " + request.uri(), e);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt(); // Restore interrupted status
            logger.error("HTTP request interrupted: {}", request.uri(), e);
            throw new ApiRequestException("Request interrupted for URL: " + request.uri(), e);
        } catch (Exception e) {
            logger.error("Unexpected error in HTTP request: {}", request.uri(), e);
            throw new ApiRequestException("Unexpected error occurred while calling: " + request.uri(), e);
        }
    }

    protected JsonNode callApi(String apiUrl, String apiHost,HttpClient httpClient, String method, String apiKey,Map<String,String>headers,JsonNode requestBody) {
        logger.info("Calling API: {}", apiUrl);
        try {
            HttpRequest request = constructUrl(method, apiUrl, apiHost, apiKey,headers,requestBody);
            HttpResponse<String> response = sendHttpRequest(request, httpClient);
            if (response.body() == null || response.body().isEmpty()) {
                throw new ApiRequestException("Empty response body received for: " + apiUrl);
            }
            return objectMapper.readTree(response.body());
        } catch (JsonProcessingException e) {
            logger.error("Failed to parse JSON response from: {} - Response: {}", apiUrl, e.getMessage(), e);
            throw new ApiRequestException("Failed to parse JSON response from: " + apiUrl, e);
        } catch (Exception e) {
            logger.error("API call failed for URL: {} with request: {}", apiUrl, requestBody, e);
            throw new ApiRequestException("API call failed for " + apiUrl, e);
        }
    }

    protected HttpRequest constructUrl(String method, String url, String host, String API_KEY,Map<String,String> headers,JsonNode jsonNode) throws Exception {
        logger.info("Inside constructUrl method ");
        String payload = objectMapper.writeValueAsString(jsonNode);
        logger.info("method: {}, url: {}, host: {}, payload:{} headers:{}", method, url, host, payload,headers);
        logger.info("url"+url);
            HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
                    .uri(URI.create(url.trim()));
                    logger.info("request builder",requestBuilder);
                    
                    // requestBuilder.header("Content-Type", "application/json");
                    // requestBuilder.header("authorization","test");
                    // requestBuilder.header("X-Correlator","test");
                    // requestBuilder.header("X-RapidAPI-Key", "bd84b964f1msh0c3b3fb3e781d61p1c78c2jsnb366b5862354");
                    // requestBuilder.header("X-RapidAPI-Host", "number-verification.nokia.rapidapi.com");
            for (var entry : headers.entrySet()) {
                requestBuilder.header(entry.getKey(), entry.getValue());
            }
                  logger.info("request builder",requestBuilder);   
            if ("POST".equalsIgnoreCase(method) && jsonNode != null) {
                requestBuilder.POST(HttpRequest.BodyPublishers.ofString(payload));
            } else {
                requestBuilder.GET();
            }
            HttpRequest httpRequest = requestBuilder.build();
            httpRequest.headers().map()
        .forEach((key, values) ->
                values.forEach(value ->
                        logger.info(key + ": " + value)
                )
        );
            logger.info("Constructed HTTP request: {}", httpRequest);
            return httpRequest;
    }

    protected HttpRequest constructGetRequest(String url) {
        logger.info("Constructing GET request for URL: {}", url);
        return HttpRequest.newBuilder()
                .uri(URI.create(url))
                .GET()
                .build();
    }
}

