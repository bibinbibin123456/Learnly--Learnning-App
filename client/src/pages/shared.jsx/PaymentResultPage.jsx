import { Link, useLocation } from 'react-router-dom'

export function PaymentResultPage() {
  const { pathname } = useLocation()
  const successful = pathname.endsWith('/success')

  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4 py-12">
      <section className="w-full max-w-lg rounded-3xl bg-base-100 p-8 text-center shadow-xl ring-1 ring-base-300">
        <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full text-3xl ${successful ? 'bg-success/15 text-success' : 'bg-error/15 text-error'}`}>
          {successful ? '✓' : '!'}
        </div>
        <h1 className="mt-5 text-3xl font-bold">
          {successful ? 'Payment successful' : 'Payment cancelled'}
        </h1>
        <p className="mt-3 text-base-content/70">
          {successful
            ? 'Your purchase is complete. You can continue exploring courses.'
            : 'Your payment was cancelled. Your cart is still available.'}
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link className="btn btn-primary" to="/courses">Browse courses</Link>
          {!successful && <Link className="btn btn-outline" to="/cart">Return to cart</Link>}
        </div>
      </section>
    </main>
  )
}
