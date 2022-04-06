<?php

class FnuggClient {
    protected $apiBasePath;

    public function __construct() {
        $this->apiBasePath = "https://api.fnugg.no";
    }

    public function request($path) {;
        $response = wp_remote_get( esc_url($this->apiBasePath . $path) );
        $body = wp_remote_retrieve_body( $response );
        
        return json_decode( $body );
    }
}