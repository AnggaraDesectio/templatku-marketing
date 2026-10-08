import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { DataTable, type Column, type FilterOption } from '@/components/data-table';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

const rp = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;
const pct = (a: number, b: number) => (b > 0 ? Math.round((a / b) * 100) : 0);

export default function Campaign({ kampanye }: { kampanye: Record<string, any>[] }) {
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

    const channels = [...new Set(rows.map((r) => r.channel))];

    const columns: Column<Kampanye>[] = [
        { key: 'nama', header: 'Kampanye', sortValue: (r) => r.nama },
        { key: 'channel', header: 'Channel', sortValue: (r) => r.channel },
        {
            key: 'budget',
            header: 'Budget',
            render: (r) => <span className="tnum">{rp(r.budget)}</span>,
            sortValue: (r) => r.budget,
        },
        {
            key: 'serapan',
            header: 'Serapan',
            render: (r) => <span className="tnum">{pct(r.spent, r.budget)}%</span>,
            sortValue: (r) => (r.budget > 0 ? r.spent / r.budget : 0),
            mobileHidden: true,
        },
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
            key: 'leads',
            header: 'Leads',
            render: (r) => <span className="tnum">{r.leads.toLocaleString('id-ID')}</span>,
            sortValue: (r) => r.leads,
            mobileHidden: true,
        },
        {
            key: 'status',
            header: 'Status',
            render: (r) => <ToneBadge label={r.status.label} tone={r.status.tone} />,
        },
    ];

    const filters: FilterOption[] = [
        {
            key: 'channel',
            label: 'Channel',
            options: channels.map((c) => ({ value: c, label: c })),
            match: (row: any, value: string) => row.channel === value,
        },
        {
            key: 'status',
            label: 'Status',
            options: [
                { value: 'Aktif', label: 'Aktif' },
                { value: 'Berjalan', label: 'Berjalan' },
                { value: 'Selesai', label: 'Selesai' },
            ],
            match: (row: any, value: string) => row.status.label === value,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Kampanye"
                description="Semua kampanye iklan: budget, serapan, ROAS, dan leads."
                breadcrumbs={[{ label: 'Marketing', href: '/marketing' }, { label: 'Kampanye' }]}
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Daftar Kampanye</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={rows}
                        searchKeys={['nama', 'channel']}
                        filters={filters}
                        emptyTitle="Belum ada kampanye"
                        emptyDescription="Kampanye iklan yang dibuat akan dipantau di sini."
                    />
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
