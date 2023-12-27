import { Handlers } from "$fresh/server.ts";
import { getPageOfVerses } from "@db";

type TestProps = {
  res: string;
};

export const handler: Handlers<TestProps> = {
  async GET(req, ctx) {
    try {
      const res = await getPageOfVerses({ translation: "web", pageSize: 10 });
      return ctx.render({ res: JSON.stringify(res, null, 2) });
    } catch (err) {
      console.error(err);
      return ctx.renderNotFound();
    }
  },
};

export default function Test(props: TestProps) {
  const { res } = props;
  return (
    <>
      <div>
        {res}
      </div>
    </>
  );
}
