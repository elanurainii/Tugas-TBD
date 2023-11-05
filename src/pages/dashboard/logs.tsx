import * as React from "react";

import Breadcrumbs from "@/components/core/breadcrumb";
import Layout from "@/components/layout/layout";
import BaseLayout from "@/components/layout/sidebar-layout";
import { getUser } from "@/lib/verification/getUser";
import { User } from "@/lib/slices/user-slices";
import Navbar from "@/modules/navbar";
import { GetServerSidePropsContext } from "next";

import Typography from "@/components/core/typography";
import DashboardTableLogs from "@/modules/Dashboard/table-logs";

export default function Logging({ user }: { user: User }) {
  return (
    <BaseLayout>
      <Navbar user={user.username} />
      <Layout className="h-screen flex flex-col">
        <Breadcrumbs />
        <main className="mt-2">
          <Typography variant="h2">Change log`s</Typography>
          <DashboardTableLogs />
        </main>
      </Layout>
    </BaseLayout>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await getUser(ctx);
}
