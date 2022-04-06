<?php
/**
 * Plugin Name:       Ski Resort Block
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Paulo Vinicius
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       ski-resort-block
 *
 * @package CreateBlock
 */

require_once WP_PLUGIN_DIR . "/ski-resort-block/Api/routes.php"; // SkiResortCustomRoutes

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_ski_resort_block_block_init() {
	register_block_type( __DIR__ . '/build' );
}

add_action( 'init', 'create_block_ski_resort_block_block_init' );

// Load routes class
require_once __DIR__ .'/Api/routes.php';

// Function to register our new routes from the controller.
function prefix_register_my_rest_routes() {
    $routes = new SkiResortCustomRoutes();
    $routes->register_routes();
}

add_action( 'rest_api_init', 'prefix_register_my_rest_routes' );
