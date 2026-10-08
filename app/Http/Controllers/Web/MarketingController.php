<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Support\Demo\MarketingData;
use Inertia\Inertia;
use Inertia\Response;

/** Flavor MARKETING: kampanye, leads, funnel, aset, laporan. */
class MarketingController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('marketing/index', [
            'ringkasan' => MarketingData::ringkasan(),
            'roasChart' => MarketingData::roasChart(),
            'funnels'   => MarketingData::funnels(),
            'kampanye'  => MarketingData::campaigns(),
        ]);
    }

    public function campaign(): Response
    {
        return Inertia::render('marketing/campaign', [
            'kampanye' => MarketingData::campaigns(),
        ]);
    }

    public function leads(): Response
    {
        return Inertia::render('marketing/leads', [
            'leads' => MarketingData::leads(),
        ]);
    }

    public function funnel(): Response
    {
        return Inertia::render('marketing/funnel', [
            'funnels' => MarketingData::funnels(),
            'leadsPerChannel' => MarketingData::leadsPerChannel(),
        ]);
    }

    public function aset(): Response
    {
        return Inertia::render('marketing/aset', [
            'asets' => MarketingData::asets(),
        ]);
    }

    public function laporan(): Response
    {
        return Inertia::render('marketing/laporan', [
            'ringkasan' => MarketingData::ringkasan(),
            'roasChart' => MarketingData::roasChart(),
            'leadsPerChannel' => MarketingData::leadsPerChannel(),
            'kampanye'  => MarketingData::campaigns(),
        ]);
    }
}
