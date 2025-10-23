package com.secureauth.exceptions;

import com.secureauth.utils.StandardResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ApiRequestException.class)
    public ResponseEntity<StandardResponse> handleApiRequestException(ApiRequestException ex) {
        StandardResponse response = new StandardResponse("error", ex.getMessage(), null);
        return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(response);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<StandardResponse> handleRuntimeException(RuntimeException ex) {
        StandardResponse response = new StandardResponse("error", ex.getMessage(), null);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<StandardResponse> handleGeneralException(Exception ex) {
        StandardResponse response = new StandardResponse("error", "Unexpected error occurred", null);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}
