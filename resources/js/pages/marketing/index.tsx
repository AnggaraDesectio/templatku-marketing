import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import { BarChartCard, type ChartData } from '@/components/charts';
import { DataTable, type Column } from '@/components/data-table';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { BadgeDollarSign, Megaphone, Target, Users } from 'lucide-react';

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
    status: ToneLabel;
}

interface Funnel {
    stage: string;
    count: number;
}

const rp = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

export default function MarketingIndex({
    ringkasan,
    roasChart,
    funnels,
    kampanye,
}: {
    ringkasan: Ringkasan;
    roasChart: ChartData;
    funnels: Funnel[];
    kampanye: Record<string, any>[];
}) {
    const rows: Kampanye[] = kampanye.map((c, i) => ({
        id: Number(c.id) || i + 1,
        nama: String(c.nama),
        channel: String(c.channel),
        budget: Number(c.budget),
        spent: Number(c.spent),
        revenue: Number(c.revenue),
        leads: Number(c.leads),
        status: c.status as ToneLabel,
    }));

    const maxFunnel = Math.max(...funnels.map((f) => f.count), 1);

    const columns: Column<Kampanye>[] = [
        { key: 'nama', header: 'Kampanye', sortValue: (r) => r.nama },
        { key: 'channel', header: 'Channel', sortValue: (r) => r.channel },
        {
            key: 'roas',
            header: 'ROAS',
            render: (r) => (
                <span className="tnum font-semibold text-success">
                    {r.spent > 0 ? (r.revenue / r.spent).toFixed(2) : ', '}x
                </span>
            ),
            sortValue: (r) => (r.spent > 0 ? r.revenue / r.spent : 0),
        },
        {
            key: 'spent',
            header: 'Terpakai',
            render: (r) => <span className="tnum">{rp(r.spent)}</span>,
            sortValue: (r) => r.spent,
            mobileHidden: true,
        },
        {
            key: 'status',
            header: 'Status',
            render: (r) => <ToneBadge label={r.status.label} tone={r.status.tone} />,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Marketing"
                description="Lihat kampanye mana yang paling cuan hari ini."
                actions={
                    <Button size="sm" asChild>
                        <Link href="/marketing/campaign">Kelola Kampanye</Link>
                    </Button>
                }
                breadcrumbs={[{ label: 'Marketing' }]}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    label="Budget Terpakai"
                    value={rp(ringkasan.totalSpent)}
                    delta={`${ringkasan.campaignAktif} kampanye aktif`}
                    trend="flat"
                    icon={BadgeDollarSign}
                    hint="Total belanja iklan di semua kampanye aktif."
                />
                <StatCard
                    label="Revenue"
                    value={rp(ringkasan.totalRevenue)}
                    delta="teratribusi iklan"
                    trend="up"
                    icon={Target}
                    hint="Pendapatan yang tercatat berasal dari iklan."
                />
                <StatCard
                    label="ROAS"
                    value={`${ringkasan.roas}x`}
                    delta="revenue / spent"
                    trend="up"
                    icon={Megaphone}
                    hint="Setiap Rp 1 iklan menghasilkan sekian rupiah pendapatan."
                />
                <StatCard
                    label="Total Leads"
                    value={ringkasan.totalLeads.toLocaleString('id-ID')}
                    delta={`${ringkasan.campaignAktif} kampanye aktif`}
                    trend="up"
                    icon={Users}
                    hint="Calon pelanggan yang masuk dari semua kampanye."
                />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
                <Card className="shadow-sm xl:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-base">ROAS per Kampanye</CardTitle>
                        <p className="text-muted-foreground text-sm">
                            Berapa rupiah revenue dari tiap Rp1 budget terpakai.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <BarChartCard data={roasChart} />
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Funnel Konversi</CardTitle>
                        <p className="text-muted-foreground text-sm">
                            Pengunjung hingga pelanggan bulan ini.
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {funnels.map((f, i) => (
                            <div key={f.stage}>
                                <div className="mb-1 flex items-center justify-between text-sm">
                                    <span className="font-medium">{f.stage}</span>
                                    <span className="tnum text-muted-foreground">
                                        {f.count.toLocaleString('id-ID')}
                                    </span>
                                </div>
                                <div className="bg-muted h-2.5 rounded-full">
                                    <div
                                        className="bg-primary h-2.5 rounded-full"
                                        style={{ width: `${(f.count / maxFunnel) * 100}%` }}
                                    />
                                </div>
                                {i < funnels.length - 1 && (
                                    <p className="text-muted-foreground mt-1 text-right text-xs">
                                        {((funnels[i + 1].count / f.count) * 100).toFixed(1)}% lanjut
                                    </p>
                                )}
                            </div>
                        ))}
                        <Link
                            href="/marketing/funnel"
                            className="text-primary text-sm font-medium hover:underline"
                        >
                            Lihat detail funnel →
                        </Link>
                    </CardContent>
                </Card>
            </div>
            <div className="mt-4">
                <DataTable
                    columns={columns}
                    rows={rows}
                    searchKeys={['nama', 'channel']}
                    pageSize={5}
                    emptyTitle="Belum ada kampanye"
                    emptyDescription="Kampanye iklan yang dibuat akan dipantau di sini."
                />
            </div>
        </AuthenticatedLayout>
    );
}
