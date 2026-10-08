<?php

use App\Http\Controllers\Web\MarketingController;
use Illuminate\Support\Facades\Route;

/** Flavor MARKETING (didaftarkan oleh worker routes/web.php). */
Route::prefix('marketing')->name('marketing.')->group(function () {
    Route::get('/', [MarketingController::class, 'index'])->name('index');
    Route::get('/campaign', [MarketingController::class, 'campaign'])->name('campaign');
    Route::get('/leads', [MarketingController::class, 'leads'])->name('leads');
    Route::get('/funnel', [MarketingController::class, 'funnel'])->name('funnel');
    Route::get('/aset', [MarketingController::class, 'aset'])->name('aset');
    Route::get('/laporan', [MarketingController::class, 'laporan'])->name('laporan');
});
