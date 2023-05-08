export default function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className='mb-4'>
      <h1 className='text-3xl text-gray-600 font-bold'>{title}</h1>
      <p className='text-gray-700 text-sm -mt-1'>{subtitle}</p>
    </div>
  );
}
