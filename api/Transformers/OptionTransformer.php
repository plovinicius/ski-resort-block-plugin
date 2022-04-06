<?php

require_once WP_PLUGIN_DIR . "/ski-resort-block/Api/Models/Option.php";

class OptionTransformer {
    public function transform($data) {
        $collection = array('data' => []);

        foreach ( $data as $item ) {
            $option = new Option($item);
            $collection['data'][] = $option->toArray();
        }

        return $collection;
    }
}