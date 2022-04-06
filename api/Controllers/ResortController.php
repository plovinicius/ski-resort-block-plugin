<?php
require_once WP_PLUGIN_DIR ."/ski-resort-block/Api/Transformers/OptionTransformer.php";
require_once WP_PLUGIN_DIR ."/ski-resort-block/Api/Models/Resort.php";
require_once WP_PLUGIN_DIR ."/ski-resort-block/Services/FnuggClient.php";
require_once WP_PLUGIN_DIR ."/ski-resort-block/Services/CustomCache.php";

class ResortController {
    private $optionTransformer;
    private $fnuggClient;
    private $customCache;

    public function __construct() {
        $this->optionTransformer = new OptionTransformer();
        $this->fnuggClient = new FnuggClient();
        $this->customCache = new CustomCache("ski-resort-block-fnugg");
    }

    public function autocomplete( $request ) {
        $term = $request->get_param('q');
        $path = "/suggest/autocomplete/?q={$term}";

        $data = $this->customCache->get($path, function () use ($path) {
            $response = $this->fnuggClient->request($path);
            $data = rest_ensure_response( array('data' => []) );

            if ( !is_wp_error($response)) {
                $data = rest_ensure_response( $this->optionTransformer->transform($response->result) );
            }

            $this->customCache->set($path, $data);

            return $data;
        });

        return $data;
    }

    public function search( $request ) {
        $search = $request->get_param('q');
        $path = "/search/?q={$search}";

        $data = $this->customCache->get($path, function () use ($path) {
            $response = $this->fnuggClient->request($path);
            $responseData = @$response->hits->hits[0] ? $response->hits->hits[0] : [];
            $data = rest_ensure_response( array('data' => []) );
            
            if ( !is_wp_error($response) && !empty($responseData) ) {
                $resort = new Resort($responseData);
                $data = rest_ensure_response( array('data' => $resort->toArray()) );
            }

            $this->customCache->set($path, $data);

            return $data;
        });

        return $data;
    }
}