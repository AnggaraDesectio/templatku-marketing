import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { DataTable, type Column, type FilterOption } from '@/components/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Aset {
    id: number;
    nama: string;
    tipe: string;
    campaign: string;
    tanggal: string;
}

export default function Aset({ asets }: { asets: Record<string, any>[] }) {
    const rows: Aset[] = asets.map((a, i) => ({
        id: Number(a.id) || i + 1,
        nama: String(a.nama),
        tipe: String(a.tipe),
        campaign: String(a.campaign),
        tanggal: String(a.tanggal),
    }));

    const tipes = [...new Set(rows.map((r) => r.tipe))];

    const columns: Column<Aset>[] = [
        { key: 'nama', header: 'Nama Aset', sortValue: (r) => r.nama },
        {
            key: 'tipe',
            header: 'Tipe',
            render: (r) => <Badge variant="secondary">{r.tipe}</Badge>,
            sortValue: (r) => r.tipe,
        },
        {
            key: 'campaign',
            header: 'Kampanye',
            sortValue: (r) => r.campaign,
            mobileHidden: true,
        },
        { key: 'tanggal', header: 'Tanggal', sortValue: (r) => r.tanggal },
    ];

    const filters: FilterOption[] = [
        {
            key: 'tipe',
            label: 'Tipe',
            options: tipes.map((t) => ({ value: t, label: t })),
            match: (row: any, value: string) => row.tipe === value,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Aset Kreatif"
                description="Materi kampanye: video, desain, foto, dan dokumen pendukung."
                breadcrumbs={[{ label: 'Marketing', href: '/marketing' }, { label: 'Aset' }]}
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Perpustakaan Aset</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={rows}
                        searchKeys={['nama', 'campaign', 'tipe']}
                        filters={filters}
                        emptyTitle="Belum ada aset"
                        emptyDescription="Banner, video, dan materi iklan baru akan dikumpulkan di sini."
                    />
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
