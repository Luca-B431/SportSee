export const loader = async ({ request }: { request: Request }) => {
  return new Response(null, {
    status: 302,
    headers: {
      Location: "/user/12",
    },
  });
};
