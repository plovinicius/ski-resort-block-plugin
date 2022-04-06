<?php

class CustomCache {
    private $group;

    public function __construct($group) {
        $this->group = $group;
    }

    public function get($key, $callback) {
        $data = get_transient("{$this->group}-{$key}");

        if ( $data === false ) {
            return $callback();
        }

        return $data;
    }

    public function set($key, $data, $time = HOUR_IN_SECONDS) {
        set_transient("{$this->group}-{$key}", $data, $time);
    }

    public function clear($key) {
        delete_transient("{$this->group}-{$key}");
    }
}