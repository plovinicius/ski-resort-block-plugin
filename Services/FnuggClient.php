<?php

class FnuggClient {
    protected $apiBasePath;

    public function __construct() {
        $this->apiBasePath = "https://api.fnugg.no";
    }

    public function request($path, $query) {;
        $response = wp_remote_get( esc_url($this->apiBasePath . $path ."/?". $query) );
        $body = wp_remote_retrieve_body( $response );
        
        return $this->validateResponse(json_decode( $body ));
    }

    private function validateResponse($response) {
        if ( is_wp_error( $response ) ) {
            return null;
        }

        return $response;
    }
}