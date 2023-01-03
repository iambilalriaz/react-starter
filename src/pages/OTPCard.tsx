/* eslint-disable no-param-reassign */
/* eslint-disable dot-notation */
/* eslint-disable camelcase */
import { Field, FieldArray, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import CardTitle from '../features/authentication/components/CardTitle';
import CardSubtitle from '../features/authentication/components/CardSubtitle';
import OTPInput from '../features/authentication/components/OTPInput';
import OTPLayout from '../layouts/OTPLayout';
import { AuthService } from '../services/AuthService';
import { FormikField } from '../types';
import { VendorService } from '../services/VendorService';

const CODE_LENGTH = [1, 2, 3, 4, 5, 6];
type FormValues = {
  codes: string[];
};

export function OTPCodeCard() {
  const [countDown, setCountDown] = useState(+(localStorage.getItem('countDown') || 59));
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let intervalId = 0;
    if (countDown >= 1) {
      intervalId = window.setInterval(() => {
        localStorage.setItem('countDown', (countDown - 1).toString());
        setCountDown(+(localStorage.getItem('countDown') || 0));
      }, 1000);
    } else {
      localStorage.removeItem('countDown');
    }
    return () => clearInterval(intervalId);
  }, [countDown]);
  const onCodeSubmit = (values: FormValues) => {
    setIsLoading(true);
    if (!values.codes.includes('')) {
      const authService = new AuthService();
      authService
        .verifySMSCode({
          phoneNumber: localStorage.getItem('phoneNumber') || '',
          code: values?.codes?.join('')
        })
        .then(({ response }) => {
          setIsLoading(false);

          localStorage.setItem(
            'user',
            JSON.stringify({
              email: localStorage.getItem('userEmail'),
              phoneNumber: localStorage.getItem('phoneNumber') || '',
              role: 'user'
            })
          );
          localStorage.setItem('accessToken', response?.accessToken);
          localStorage.setItem('refreshToken', response?.refreshToken);
          localStorage.setItem('expiryTime', `${moment().add(25, 'minute')}`);
          localStorage.removeItem('emailAccessToken');
          localStorage.removeItem('userEmail');
          localStorage.removeItem('countDown');
          localStorage.removeItem('phoneNumber');

          const inviteCode = localStorage.getItem('inviteCode');
          if (inviteCode) {
            const vendorService = new VendorService();
            vendorService
              .acceptInvite(localStorage.getItem('inviteCode') as string)
              .then(() => {
                navigate('/dashboard/user');
              })
              .catch((err) => toast.error(err?.message));
          } else {
            navigate('/dashboard/user');
          }
        })
        .catch(() => {
          setIsLoading(false);
          toast.error('Unable to verify code.');
        });
    }
  };
  const subTitle = `A 6 digit OTP Code has been send to your ${localStorage.getItem(
    'phoneNumber'
  )} given by you`;
  return (
    <OTPLayout>
      <Card>
        <CardTitle>OTP Code</CardTitle>
        <CardSubtitle>{subTitle}</CardSubtitle>
        <Formik
          initialValues={{ codes: Array(6).fill('') }}
          onSubmit={onCodeSubmit}
          render={() => (
            <Form>
              <FieldArray
                name="codes"
                render={() => (
                  <div className="mx-[15%] my-[3rem] flex w-[70%] justify-between">
                    {CODE_LENGTH?.map((code, index) => (
                      <div key={`${code + index}`} className="w-[20px]">
                        <Field name={`codes.${index}`}>
                          {({ field }: { field: FormikField }) => (
                            <OTPInput id={code.toString()} placeholder="0" field={field} />
                          )}
                        </Field>
                      </div>
                    ))}
                  </div>
                )}
              />
              <p className="text-center text-[15px] font-normal leading-[11px] text-accent">
                <button
                  type="button"
                  className={`${countDown > 1 ? 'disabled pointer-events-none' : 'cursor-pointer'}`}
                  onClick={() => {
                    setCountDown(59);
                    localStorage.setItem('countDown', '59');
                  }}
                >
                  Resend OTP
                </button>{' '}
                {countDown ? (
                  <span className="font-normal leading-[14px] text-primary">({countDown}s)</span>
                ) : null}
              </p>
              <div className="mt-16">
                <Button btnState={isLoading ? 'loading' : 'normal'} type="submit" size="lg">
                  Done
                </Button>
              </div>
            </Form>
          )}
        />
      </Card>
    </OTPLayout>
  );
}
