<?php
/*
Plugin Name: Reveal Shortcode Plugin for WordPress
Plugin Author: Matthew Hadwen
Plugin URI:
Author URI: http://www.mawaha.com
Version: 1.0
Description: Adds a handy shortcode for creating inline modal box content for use with the Zurb Foundation Reveal script. Requires Zurb Foundation Reveal.
*/

/**
 * Handles the shortcode
 *
 * @access public
 * @param mixed $atts
 * @param mixed $content (default: null)
 * @return void
 */
function mwh_reveal_shortcode($atts, $content = null){

	if ( is_null($content) )
		return "[Warning! Reveal shortcode requires content]";

	extract(shortcode_atts(array(
			'id' => null,
			'link' => false
		), $atts));

	if (!isset($id))
		return "[Warning! Reveal shortcode requires an ID]";


	$content = '<div class="reveal-modal" id="' . $id . '">' . $content . '</div>';

	if($link)
		$content = '<a href="#" data-reveal-id="' . $id . '">' . $link . '</a>' . $content;

	return do_shortcode($content);
}
add_shortcode('reveal', 'mwh_reveal_shortcode');

/**
 * Enqueue necessary scripts
 *
 * @access public
 * @return void
 */
function mwh_reveal_shortcode_scripts(){

	if (!is_admin){
		wp_enqueue_script('jquery');
		wp_enqueue_script('reveal-shortcode', plugins_url('js/reveal-shortcode.js', __FILE__));
	}
}
add_action('wp_enqueue_scripts', 'mwh_reveal_shortcode_scripts');

/**
 * mwh_add_reveal_button function.
 *
 * @access public
 * @return void
 */
function mwh_add_reveal_button(){

	if ( ! current_user_can('edit_posts') && ! current_user_can('edit_pages') )
		return;

	if ( get_user_option('rich_editing') == false )
		return;

	add_filter('mce_external_plugins', 'mwh_add_reveal_mce_plugin');
	add_filter('mce_buttons', 'mwh_register_reveal_button');
}
add_action('init', 'mwh_add_reveal_button');

/**
 * Add MCE plugin script location to MCE plugin array
 *
 * @access public
 * @param mixed $plugin_array
 * @return void
 */
function mwh_add_reveal_mce_plugin($plugin_array){

	$plugin_array['mwhreveal'] = plugins_url('/reveal-shortcode/js/reveal-shortcode-plugin.js');

	return $plugin_array;
}

/**
 * Add reveal to list of buttons on Tiny MCE text editor
 *
 * @access public
 * @param array $buttons
 * @return array $buttons
 */
function mwh_register_reveal_button($buttons){

	array_push($buttons, "reveal");

	return $buttons;
}

/**
 * mwh_refresh_mce function.
 *
 * @access public
 * @param int $version
 * @return $version
 */
function mwh_refresh_mce($version){
	$version +=1;

	return $version;
}
add_filter('tiny_mce_version', 'mwh_refresh_mce');

/**
 * mwh_add_reveal_quicktag function.
 *
 * @access public
 * @return void
 */
function mwh_add_reveal_quicktag() {
?>
    <script type="text/javascript">
	    QTags.addButton( 'mwh_reveal', 'reveal', '[reveal id="" link=""]', '[/reveal]', 'R', 'Reveal Modal Box', 170 );
    </script>
<?php
}
add_action( 'admin_print_footer_scripts', 'mwh_add_reveal_quicktag' );