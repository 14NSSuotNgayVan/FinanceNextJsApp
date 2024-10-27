import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchFilteredCustomers, fetchInvoicesPages } from '@/app/lib/data';
import { Metadata } from 'next';
import CustomersTable from '@/app/ui/customers/table';

export const metadata: Metadata = {
    title: 'Customer',
};

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const customers = await fetchFilteredCustomers(query);
    return (
        <CustomersTable customers={customers} />
    );
}