import Counter from "./Counter";

export default function Page() {
  const posts = [
    {
      name: "mg mg",
      age: 12,
    },
    {
      name: "aye",
      age: 22,
    },
  ];

  const pointer = 12

  return (
    <div>
      <Counter data={posts} pointer={pointer} />
    </div>
  );
}
