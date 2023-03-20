import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../App'
import { ServiceApi } from '../services/Api'

function LoginPage() {
  let navigate = useNavigate()
  let auth = useAuth()

  const [phoneNumber, setPhoneNumber] = useState('')
  const [accessCode, setAccessCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)
    const res: any = await ServiceApi.requestLogin(phoneNumber)
    if (res?.data?.success) {
      setIsSubmit(true)
    }

    if (res.data?.message === 'The account is exist already') {
      auth.signin(phoneNumber, () => {
        // Send them back to the page they tried to visit when they were
        // redirected to the login page. Use { replace: true } so we don't create
        // another entry in the history stack for the login page.  This means that
        // when they get to the protected page and click the back button, they
        // won't end up back on the login page, which is also really nice for the
        // user experience.
        navigate('/', { replace: true })
      })
    }
    setIsLoading(false)
  }
  const onVerifyAccessCode = async () => {
    setIsLoading(true)

    const res: any = await ServiceApi.verifyAccessCode(phoneNumber, accessCode)

    if (res?.data?.success) {
      auth.signin(res?.data?.data?.phoneNumber, () => {
        // Send them back to the page they tried to visit when they were
        // redirected to the login page. Use { replace: true } so we don't create
        // another entry in the history stack for the login page.  This means that
        // when they get to the protected page and click the back button, they
        // won't end up back on the login page, which is also really nice for the
        // user experience.
        navigate('/', { replace: true })
      })
    }

    setIsLoading(false)
  }

  return (
    <div className="h-screen w-screen center bg-default text-white">
      <div className="w-[538px] p-9 rounded-[24px] bg-black2">
        <h1 className="text-5xl text-center text-main">SIGN IN</h1>
        <div className="gap-4 mt-4 col">
          <div>
            <label>Phone Number:</label>
            <input
              name="phoneNumber"
              type="text"
              className="bg-black3 px-4 py-[14px] mt-2 w-full rounded-[12px]"
              onChange={(e) => setPhoneNumber(e.target.value)}
              disabled={isLoading || isSubmit}
            />
          </div>
          {isSubmit && (
            <div>
              <label>Access Code:</label>
              <input
                name="accessCode"
                type="text"
                onChange={(e) => setAccessCode(e.target.value)}
                disabled={isLoading}
              />
            </div>
          )}
        </div>
        <div className="mt-6 center">
          {!isSubmit ? (
            <button
              type="button"
              className="bg-gradient-default px-7 py-3 rounded-[8px]  "
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Submitting' : 'Submit'}
            </button>
          ) : (
            <button
              type="button"
              className="bg-gradient-default px-7 py-3 rounded-[8px]  "
              onClick={onVerifyAccessCode}
              disabled={isLoading}
            >
              {isLoading ? 'Verifying' : 'Verify'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginPage
