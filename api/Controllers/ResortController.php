<?php
require_once WP_PLUGIN_DIR ."/ski-resort-block/Api/Transformers/OptionTransformer.php";
require_once WP_PLUGIN_DIR ."/ski-resort-block/Api/Models/Resort.php";
require_once WP_PLUGIN_DIR ."/ski-resort-block/Services/FnuggClient.php";

class ResortController {
    private $optionTransformer;
    private $fnuggClient;

    public function __construct() {
        $this->optionTransformer = new OptionTransformer();
        $this->fnuggClient = new FnuggClient();
    }

    public function autocomplete( $request ) {
        $term = $request->get_param('q');
        $response = $this->fnuggClient->request("/suggest/autocomplete", "q={$term}");

        if (!$response) {
            return rest_ensure_response( array('data' => []) );
        }

        return rest_ensure_response( $this->optionTransformer->transform($response->result) );
    }

    public function search( $request ) {
        $search = $request->get_param('q');
        $response = $this->fnuggClient->request("/search", "q={$search}");
        $responseData = $response->hits->hits[0];
        
        if ( !$response || empty($responseData) ) {
            return rest_ensure_response( array('data' => []) );
        }

        $resort = new Resort($responseData);

        // Return all of our comment response data.
        return rest_ensure_response( array('data' => $resort->toArray()) );
    }
}