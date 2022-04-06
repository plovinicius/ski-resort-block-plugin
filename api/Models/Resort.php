<?php

class Resort {
    private $name;
    private $address;
    private $region;
    private $last_updated;
    private $weather = [];
    private $wind = [];
    private $images = [];

    public function __construct($data) {
        if (!empty($data)) {
            $source = $data->_source;
            $weatherData = $source->conditions->forecast->today->top;
            $images = $source->images;

            $this->name = esc_attr($source->name);
            $this->address = esc_attr($source->contact->address);
            $this->region = esc_attr($source->region[0]);
            $this->last_updated = date_i18n("d.m.Y - H:i", strtotime(esc_attr($source->last_updated)));
            $this->weather = [
                'description' => esc_attr($weatherData->condition_description),
                'temperature' => esc_attr($weatherData->temperature->value),
                'icon_id' => esc_attr($weatherData->symbol->fnugg_id)
            ];
            $this->wind = [
                'mps' => $weatherData->wind->mps,
                'description' => $weatherData->wind->speed
            ];
            $this->images = [
                'mobile' => $images->mobile->scale1->cover,
                'default' => $images->image_16_9_s
            ];
        }
    }

    public function toArray() {
        return [
            'name' => $this->name,
            'address' => $this->address,
            'region' => $this->region,
            'last_updated' => $this->last_updated,
            'weather' => $this->weather,
            'wind' => $this->wind,
            'images' => $this->images
        ];
    }
}