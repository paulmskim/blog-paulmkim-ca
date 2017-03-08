<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package PK_Blog
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">

<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="site">
  <a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'pk-blog' ); ?></a>

  <header id="masthead" class="site-header" role="banner">
    <nav id="site-navigation" class="main-navigation" role="navigation">
      <?php
      wp_nav_menu( array( 'theme_location' => 'menu-1', 'menu_id' => 'primary-menu' ) );
      if ( dynamic_sidebar( 'header-search-widget-area' ) ) : else : endif; ?>
      <div class='menu-close-btn'>×</div>
    </nav><!-- #site-navigation -->

    <div class="site-branding">
      <a href=<?php echo esc_url( home_url() ); ?> class="custom-logo-link" rel="home" itemprop="url">
        paul kim
      </a>
      <?php
      if ( is_front_page() && is_home() && ( is_active_sidebar( 'header-description-widget-area' ) || is_customize_preview() ) ) :
        dynamic_sidebar( 'header-description-widget-area' );
      endif; ?>
    </div><!-- .site-branding -->

    <div class="menu-toggle"><?php esc_html_e( 'Menu', 'pk-blog' ); ?></div><!-- .menu-toggle -->
  </header><!-- #masthead -->

  <div id="content" class="site-content">
