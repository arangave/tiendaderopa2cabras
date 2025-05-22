import ResetPasswordForm from './ResetPasswordForm';

interface PageProps {
  params: {
    token: string;
  };
}

export default function ResetPasswordPage({ params }: PageProps) {
  return <ResetPasswordForm token={params.token} />;
}

