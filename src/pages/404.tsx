import Layout from "@/components/layout/layout";
import Typography from "@/components/core/typography";
import ButtonLink from "@/components/links/button-links";

export default function Notfound() {
  return (
    <Layout className="gap-2 items-center justify-center text-center h-screen flex-col">
      <Typography variant="p">
        Oops, looks like you wondered to the wrong place.
      </Typography>
      <ButtonLink href="/" variant="primary">
        Return Home
      </ButtonLink>
    </Layout>
  );
}
