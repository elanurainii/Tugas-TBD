import * as React from "react";

import Button from "@/components/buttons/button";
import Breadcrumbs from "@/components/core/breadcrumb";
import Typography from "@/components/core/typography";
import Input from "@/components/forms/input";
import Layout from "@/components/layout/layout";
import BaseLayout from "@/components/layout/sidebar-layout";

import { getUser } from "@/lib/verification/getUser";
import { User } from "@/lib/slices/user-slices";
import { useAppStore } from "@/lib/store";

import Dashboardmain from "@/modules/Dashboard/main";
import Navbar from "@/modules/navbar";
import DashboardTable from "@/modules/Dashboard/table-rekap";
import Footer from "@/modules/footer";

import { GetServerSidePropsContext } from "next";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { ImSpinner2 } from "react-icons/im";

import toast, { Toaster } from "react-hot-toast";

interface Inputs {
  id: string;
  mataKuliah: string;
}

export default function Dashboard({ user }: { user: User }) {
  const { postMK, errorMessagePost } = useAppStore();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const methods = useForm<Inputs>({
    mode: "onTouched",
  });
  const { handleSubmit } = methods;
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsLoading(true);
      await postMK(data.id, data.mataKuliah);
      toast("Mata Kuliah berhasil dibuat");
    } catch (err) {
      console.log(err);
      toast.error("Mata Kuliah berhasil dibuat");
    } finally {
      setIsLoading(false);
    }

    return;
  };
  ///-----End Region create Matakuliah-----///
  return (
    <BaseLayout>
      <Navbar user={user.username} />
      <Layout className="flex flex-col h-screen">
        <Breadcrumbs />
        <DashboardTable />
      </Layout>
      <Footer />
    </BaseLayout>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await getUser(ctx);
}
