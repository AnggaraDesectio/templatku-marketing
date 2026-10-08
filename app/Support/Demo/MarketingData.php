<?php

namespace App\Support\Demo;

/**
 * Data demo flavor MARKETING: kampanye, leads, funnel, aset.
 * Kontrak: status/stage berbentuk ['label' => .., 'tone' => ..]
 * (tanpa HTML), tone: success | warning | destructive | info.
 * Angka ditulis eksplisit supaya total konsisten.
 */
class MarketingData
{
    public static function campaigns(): array
    {
        return [
            ['id' => 1, 'nama' => 'Promo 10.10 Flash Sale', 'channel' => 'Instagram Ads',    'budget' => 12000000, 'spent' => 11400000, 'revenue' =>  68400000, 'leads' => 1240, 'status' => ['label' => 'Aktif',   'tone' => 'info']],
            ['id' => 2, 'nama' => 'Belanja Tengah Malam',   'channel' => 'Google Ads',       'budget' => 20000000, 'spent' => 19600000, 'revenue' => 117600000, 'leads' => 2150, 'status' => ['label' => 'Aktif',   'tone' => 'info']],
            ['id' => 3, 'nama' => 'Live Shopping Harian',   'channel' => 'TikTok Ads',       'budget' =>  8000000, 'spent' =>  7900000, 'revenue' =>  63200000, 'leads' =>  980, 'status' => ['label' => 'Aktif',   'tone' => 'info']],
            ['id' => 4, 'nama' => 'Retargeting Keranjang',  'channel' => 'Facebook Ads',     'budget' =>  6000000, 'spent' =>  6000000, 'revenue' =>  42000000, 'leads' =>  640, 'status' => ['label' => 'Selesai', 'tone' => 'success']],
            ['id' => 5, 'nama' => 'Newsletter Mingguan',    'channel' => 'Email',            'budget' =>  1500000, 'spent' =>  1400000, 'revenue' =>  12600000, 'leads' =>  320, 'status' => ['label' => 'Aktif',   'tone' => 'info']],
            ['id' => 6, 'nama' => 'Blast WhatsApp Gajian',  'channel' => 'WhatsApp',         'budget' =>  2000000, 'spent' =>  1800000, 'revenue' =>  18000000, 'leads' =>  410, 'status' => ['label' => 'Aktif',   'tone' => 'info']],
            ['id' => 7, 'nama' => 'SEO Artikel Batch 4',    'channel' => 'SEO',              'budget' => 10000000, 'spent' =>  4200000, 'revenue' =>  21000000, 'leads' =>  860, 'status' => ['label' => 'Berjalan','tone' => 'warning']],
            ['id' => 8, 'nama' => 'Endorse Sinta Official', 'channel' => 'KOL',              'budget' => 15000000, 'spent' => 15000000, 'revenue' =>  97500000, 'leads' => 1720, 'status' => ['label' => 'Selesai', 'tone' => 'success']],
        ];
    }

    public static function leads(): array
    {
        return [
            ['id' =>  1, 'nama' => 'Andi Prasetyo',   'sumber' => 'Instagram Ads', 'campaign' => 'Promo 10.10 Flash Sale', 'nilai' =>  850000, 'stage' => ['label' => 'Baru',      'tone' => 'info']],
            ['id' =>  2, 'nama' => 'Maya Kusuma',     'sumber' => 'Google Ads',    'campaign' => 'Belanja Tengah Malam',   'nilai' => 1200000, 'stage' => ['label' => 'Dihubungi', 'tone' => 'warning']],
            ['id' =>  3, 'nama' => 'Budi Hartono',    'sumber' => 'TikTok Ads',    'campaign' => 'Live Shopping Harian',   'nilai' =>  450000, 'stage' => ['label' => 'Nego',      'tone' => 'warning']],
            ['id' =>  4, 'nama' => 'Dewi Anggraini',  'sumber' => 'Facebook Ads',  'campaign' => 'Retargeting Keranjang',  'nilai' => 2350000, 'stage' => ['label' => 'Deal',      'tone' => 'success']],
            ['id' =>  5, 'nama' => 'Rudi Setiawan',   'sumber' => 'Email',         'campaign' => 'Newsletter Mingguan',    'nilai' =>  600000, 'stage' => ['label' => 'Baru',      'tone' => 'info']],
            ['id' =>  6, 'nama' => 'Sinta Maharani',  'sumber' => 'KOL',           'campaign' => 'Endorse Sinta Official', 'nilai' => 3200000, 'stage' => ['label' => 'Deal',      'tone' => 'success']],
            ['id' =>  7, 'nama' => 'Agus Wijaya',     'sumber' => 'WhatsApp',      'campaign' => 'Blast WhatsApp Gajian',  'nilai' =>  750000, 'stage' => ['label' => 'Dihubungi', 'tone' => 'warning']],
            ['id' =>  8, 'nama' => 'Rina Puspita',    'sumber' => 'Google Ads',    'campaign' => 'Belanja Tengah Malam',   'nilai' => 1500000, 'stage' => ['label' => 'Nego',      'tone' => 'warning']],
            ['id' =>  9, 'nama' => 'Dedi Kurniawan',  'sumber' => 'Instagram Ads', 'campaign' => 'Promo 10.10 Flash Sale', 'nilai' =>  500000, 'stage' => ['label' => 'Gagal',     'tone' => 'destructive']],
            ['id' => 10, 'nama' => 'Fitri Rahayu',    'sumber' => 'SEO',           'campaign' => 'SEO Artikel Batch 4',    'nilai' =>  900000, 'stage' => ['label' => 'Baru',      'tone' => 'info']],
            ['id' => 11, 'nama' => 'Hendra Saputra',  'sumber' => 'Facebook Ads',  'campaign' => 'Retargeting Keranjang',  'nilai' => 1850000, 'stage' => ['label' => 'Deal',      'tone' => 'success']],
            ['id' => 12, 'nama' => 'Nina Kurnia',     'sumber' => 'TikTok Ads',    'campaign' => 'Live Shopping Harian',   'nilai' =>  400000, 'stage' => ['label' => 'Dihubungi', 'tone' => 'warning']],
        ];
    }

    /** Jumlah per tahap funnel: Pengunjung -> Lead -> Prospek -> Nego -> Pelanggan. */
    public static function funnels(): array
    {
        return [
            ['stage' => 'Pengunjung', 'count' => 48500],
            ['stage' => 'Lead',       'count' =>  8320],
            ['stage' => 'Prospek',    'count' =>  3150],
            ['stage' => 'Nego',       'count' =>  1240],
            ['stage' => 'Pelanggan',  'count' =>   386],
        ];
    }

    public static function asets(): array
    {
        return [
            ['id' => 1, 'nama' => 'Video promo 10.10 (30 detik)', 'tipe' => 'Video',      'campaign' => 'Promo 10.10 Flash Sale', 'tanggal' => '2026-10-02'],
            ['id' => 2, 'nama' => 'Banner hero website sale',     'tipe' => 'Desain',     'campaign' => 'Belanja Tengah Malam',   'tanggal' => '2026-10-03'],
            ['id' => 3, 'nama' => 'Skrip live host 3 jam',       'tipe' => 'Copywriting','campaign' => 'Live Shopping Harian',   'tanggal' => '2026-10-04'],
            ['id' => 4, 'nama' => 'Landing page retargeting',    'tipe' => 'Landing Page','campaign' => 'Retargeting Keranjang', 'tanggal' => '2026-09-28'],
            ['id' => 5, 'nama' => 'Template blast WA gajian',    'tipe' => 'Template',   'campaign' => 'Blast WhatsApp Gajian',  'tanggal' => '2026-10-05'],
            ['id' => 6, 'nama' => 'Foto produk flatlay batch',  'tipe' => 'Foto',       'campaign' => 'Promo 10.10 Flash Sale', 'tanggal' => '2026-09-30'],
            ['id' => 7, 'nama' => 'Brief KOL + rate card',       'tipe' => 'Dokumen',    'campaign' => 'Endorse Sinta Official', 'tanggal' => '2026-10-01'],
            ['id' => 8, 'nama' => 'Artikel SEO: tips belanja',   'tipe' => 'Artikel',    'campaign' => 'SEO Artikel Batch 4',    'tanggal' => '2026-10-06'],
        ];
    }

    public static function ringkasan(): array
    {
        $c = self::campaigns();
        $budget  = array_sum(array_column($c, 'budget'));
        $spent   = array_sum(array_column($c, 'spent'));
        $revenue = array_sum(array_column($c, 'revenue'));
        $leads   = array_sum(array_column($c, 'leads'));

        return [
            'totalBudget'    => $budget,                 // 74.500.000
            'totalSpent'     => $spent,                  // 67.300.000
            'totalRevenue'   => $revenue,                // 440.300.000
            'roas'           => $spent > 0 ? round($revenue / $spent, 2) : 0, // 6,54
            'totalLeads'     => $leads,                  // 8.320
            'campaignAktif'  => count(array_filter($c, fn ($x) => in_array($x['status']['label'], ['Aktif', 'Berjalan']))),
            'konversi'       => round(386 / 8320 * 100, 1), // lead -> pelanggan (%)
        ];
    }

    /** ROAS per kampanye untuk grafik: label + nilai. */
    public static function roasChart(): array
    {
        $labels = [];
        $data   = [];
        foreach (self::campaigns() as $c) {
            $labels[] = $c['nama'];
            $data[]   = $c['spent'] > 0 ? round($c['revenue'] / $c['spent'], 2) : 0;
        }
        return [
            'labels'   => $labels,
            'datasets' => [['label' => 'ROAS (x)', 'data' => $data]],
        ];
    }

    /** Leads per channel untuk donut: label + jumlah. */
    public static function leadsPerChannel(): array
    {
        $map = [];
        foreach (self::campaigns() as $c) {
            $map[$c['channel']] = ($map[$c['channel']] ?? 0) + $c['leads'];
        }
        return [
            'labels'   => array_keys($map),
            'datasets' => [['label' => 'Leads', 'data' => array_values($map)]],
        ];
    }
}
