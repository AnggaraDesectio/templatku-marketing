import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { DataTable, type Column, type FilterOption } from '@/components/data-table';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Lead {
    id: number;
    nama: string;
    sumber: string;
    campaign: string;
    nilai: number;
    stage: ToneLabel;
}

const rp = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

export default function Leads({ leads }: { leads: Record<string, any>[] }) {
    const rows: Lead[] = leads.map((l, i) => ({
        id: Number(l.id) || i + 1,
        nama: String(l.nama),
        sumber: String(l.sumber),
        campaign: String(l.campaign),
        nilai: Number(l.nilai),
        stage: l.stage as ToneLabel,
    }));

    const stages = [...new Set(rows.map((r) => r.stage.label))];

    const columns: Column<Lead>[] = [
        { key: 'nama', header: 'Nama', sortValue: (r) => r.nama },
        { key: 'sumber', header: 'Sumber', sortValue: (r) => r.sumber },
        {
            key: 'campaign',
            header: 'Kampanye',
            sortValue: (r) => r.campaign,
            mobileHidden: true,
        },
        {
            key: 'nilai',
            header: 'Estimasi Nilai',
            render: (r) => <span className="tnum font-medium">{rp(r.nilai)}</span>,
            sortValue: (r) => r.nilai,
        },
        {
            key: 'stage',
            header: 'Tahap',
            render: (r) => <ToneBadge label={r.stage.label} tone={r.stage.tone} />,
        },
    ];

    const filters: FilterOption[] = [
        {
            key: 'stage',
            label: 'Tahap',
            options: stages.map((s) => ({ value: s, label: s })),
            match: (row: any, value: string) => row.stage.label === value,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Leads"
                description="Calon pelanggan dari tiap kampanye dan tahap follow-up-nya."
                breadcrumbs={[{ label: 'Marketing', href: '/marketing' }, { label: 'Leads' }]}
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Daftar Leads</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={rows}
                        searchKeys={['nama', 'sumber', 'campaign']}
                        filters={filters}
                        emptyTitle="Belum ada lead"
                        emptyDescription="Calon pelanggan dari kampanye akan terkumpul otomatis di sini."
                    />
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
