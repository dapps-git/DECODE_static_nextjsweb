import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const regNumber = searchParams.get('reg');

  if (!regNumber || !regNumber.trim()) {
    return NextResponse.json(
      { success: false, message: 'Please enter a valid registration number' },
      { status: 400 }
    );
  }

  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';
  const targetUrl = `${backendUrl}/api/cars/public/status/${encodeURIComponent(regNumber.trim())}`;

  try {
    const res = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error('Failed to proxy request to backend:', err);
    return NextResponse.json(
      {
        success: false,
        message:
          'Unable to connect to service database. Please make sure the backend server is running on port 5000 or contact workshop support.',
      },
      { status: 503 }
    );
  }
}

