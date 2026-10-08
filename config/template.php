<?php

// Di-generate oleh php artisan template:zip - hanya berisi flavor "marketing".
// Ganti brand/warna di bawah, atau set TEMPLATE_FLAVOR di .env.

return [
    'flavor' => env('TEMPLATE_FLAVOR', 'marketing'),

    'flavors' => array (
  'marketing' => 
  array (
    'label' => 'Marketing',
    'brand_name' => 'Marketing',
    'brand_tagline' => 'Campaign & leads',
    'brand_initials' => 'MK',
    'accent' => '#2563eb',
    'category' => 'bisnis',
    'home' => 'marketing.index',
    'nav' => 
    array (
      'sections' => 
      array (
        0 => 
        array (
          'label' => 'Marketing',
          'items' => 
          array (
            0 => 
            array (
              'label' => 'Dashboard',
              'to' => '/marketing',
              'icon' => 'LayoutDashboard',
            ),
            1 => 
            array (
              'label' => 'Campaign',
              'to' => '/marketing/campaign',
              'icon' => 'Megaphone',
            ),
            2 => 
            array (
              'label' => 'Leads',
              'to' => '/marketing/leads',
              'icon' => 'Target',
            ),
            3 => 
            array (
              'label' => 'Funnel',
              'to' => '/marketing/funnel',
              'icon' => 'Filter',
            ),
            4 => 
            array (
              'label' => 'Aset',
              'to' => '/marketing/aset',
              'icon' => 'Globe',
            ),
            5 => 
            array (
              'label' => 'Laporan',
              'to' => '/marketing/laporan',
              'icon' => 'ChartLine',
            ),
          ),
        ),
        1 => 
        array (
          'label' => 'Umum',
          'items' => 
          array (
            0 => 
            array (
              'label' => 'Pengguna',
              'to' => '/users',
              'icon' => 'Users',
            ),
            1 => 
            array (
              'label' => 'Peran',
              'to' => '/roles',
              'icon' => 'ShieldCheck',
            ),
            2 => 
            array (
              'label' => 'Pengaturan',
              'to' => '/settings',
              'icon' => 'Settings',
            ),
            3 => 
            array (
              'label' => 'Profil',
              'to' => '/profile',
              'icon' => 'User',
            ),
          ),
        ),
      ),
    ),
  ),
),
];
