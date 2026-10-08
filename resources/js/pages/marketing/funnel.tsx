import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import { DonutChartCard, type ChartData } from '@/components/charts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Filter, MousePointerClick, ShoppingBag, TrendingDown, Users } from 'lucide-react';

interface Funnel {
    stage: string;
    count: number;
}

const icons = [Users, MousePointerClick, Filter, TrendingDown, ShoppingBag];

export default function Funnel({
    funnels,
    leadsPerChannel,
}: {
    funnels: Funnel[];
    leadsPerChannel: ChartData;
}) {
    const max = Math.max(...funnels.map((f) => f.count), 1);

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Funnel"
                description="Alur pengunjung dari pertama datang sampai jadi pelanggan."
                breadcrumbs={[{ label: 'Marketing', href: '/marketing' }, { label: 'Funnel' }]}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
                {funnels.map((f, i) => (
                    <StatCard
                        key={f.stage}
                        label={f.stage}
                        hint="Jumlah orang di tahap funnel ini."
                        value={f.count.toLocaleString('id-ID')}
                        delta={
                            i < funnels.length - 1
                                ? `${((funnels[i + 1].count / f.count) * 100).toFixed(1)}% lanjut ke ${funnels[i + 1].stage}`
                                : 'tahap akhir'
                        }
                        trend={i === funnels.length - 1 ? 'up' : 'flat'}
                        icon={icons[i % icons.length]}
                    />
                ))}
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
                <Card className="shadow-sm xl:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-base">Visualisasi Funnel</CardTitle>
                        <p className="text-muted-foreground text-sm">
                            Proporsi setiap tahap terhadap total pengunjung.
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {funnels.map((f, i) => (
                            <div key={f.stage}>
                                <div className="mb-1.5 flex items-center justify-between">
                                    <p className="text-sm font-medium">{f.stage}</p>
                                    <p className="tnum text-muted-foreground text-sm">
                                        {f.count.toLocaleString('id-ID')}
                                        {i > 0 && (
                                            <span className="text-success ml-2 font-medium">
                                                {((f.count / funnels[0].count) * 100).toFixed(2)}%
                                            </span>
                                        )}
                                    </p>
                                </div>
                                <div className="bg-muted h-4 rounded-md">
                                    <div
                                        className="bg-primary h-4 rounded-md transition-all"
                                        style={{ width: `${(f.count / max) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Leads per Channel</CardTitle>
                        <p className="text-muted-foreground text-sm">
                            Dari channel mana leads paling banyak.
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
