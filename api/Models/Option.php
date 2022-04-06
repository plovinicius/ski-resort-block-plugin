<?php

class Option {
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