<?php

require_once WP_PLUGIN_DIR . "/ski-resort-block/Api/Interfaces/ModelInterface.php";

class Option implements ModelInterface {
    private $name;

    function __construct($item) {
        $this->name = $item->name;
    }

    public function toArray() {
        return [
            'name' => $this->name
        ];
    }
}