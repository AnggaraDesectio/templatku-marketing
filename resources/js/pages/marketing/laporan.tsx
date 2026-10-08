import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import { BarChartCard, DonutChartCard, type ChartData } from '@/components/charts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, BadgeDollarSign, Megaphone, Target, Users } from 'lucide-react';
import { toast } from 'sonner';

interface Ringkasan {
    totalSpent: number;
    totalRevenue: number;
    roas: number;
    totalLeads: number;
    campaignAktif: number;
    konversi: number;
}

interface Kampanye {
    id: number;
    nama: string;
    channel: string;
    budget: number;
    spent: number;
    revenue: number;
    leads: number;
}

const rp = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

function exportCsv(kampanye: Kampanye[]) {
    const header = 'Kampanye,Channel,Budget,Terpakai,Revenue,Leads,ROAS';
    const lines = kampanye.map((c) =>
        [
            c.nama,
            c.channel,
            c.budget,
            c.spent,
            c.revenue,
            c.leads,
            c.spent > 0 ? (c.revenue / c.spent).toFixed(2) : ', ',
        ]
            .map((v) => `"${String(v).replace(/"/g, '""')}"`)
            .join(','),
    );
    const blob = new Blob([[header, ...lines].join('\n')], {
        type: 'text/csv;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'laporan-marketing.csv';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Laporan berhasil diunduh');
}

export default function Laporan({
    ringkasan,
    roasChart,
    leadsPerChannel,
    kampanye,
}: {
    ringkasan: Ringkasan;
    roasChart: ChartData;
    leadsPerChannel: ChartData;
    kampanye: Kampanye[];
}) {
    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Laporan Marketing"
                description="Rekap performa periode Oktober 2026."
                breadcrumbs={[{ label: 'Marketing', href: '/marketing' }, { label: 'Laporan' }]}
                actions={
                    <Button variant="outline" size="sm" onClick={() => exportCsv(kampanye)}>
                        <Download className="mr-2 h-4 w-4" /> Export CSV
                    </Button>
                }
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Budget Terpakai" value={rp(ringkasan.totalSpent)} delta="periode ini" trend="flat" icon={BadgeDollarSign} hint="Total belanja iklan pada periode laporan." />
                <StatCard label="Revenue Teratribusi" value={rp(ringkasan.totalRevenue)} delta="dari kampanye iklan" trend="up" icon={Target} hint="Pendapatan yang tercatat berasal dari iklan." />
                <StatCard label="ROAS Rata-rata" value={`${ringkasan.roas}x`} delta="revenue / spent" trend="up" icon={Megaphone} hint="Rata-rata hasil per rupiah belanja iklan." />
                <StatCard label="Konversi Lead → Pelanggan" value={`${ringkasan.konversi}%`} delta={`${ringkasan.totalLeads.toLocaleString('id-ID')} leads`} trend="up" icon={Users} hint="Porsi leads yang menjadi pelanggan berbayar." />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
                <Card className="shadow-sm xl:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-base">ROAS per Kampanye</CardTitle>
                        <p className="text-muted-foreground text-sm">
                            KOL dan iklan berbayar jadi penyumbang ROAS tertinggi.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <BarChartCard data={roasChart} />
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Leads per Channel</CardTitle>
                        <p className="text-muted-foreground text-sm">
                            Distribusi sumber leads.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <DonutChartCard data={leadsPerChannel} />
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
