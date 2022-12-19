/* eslint-disable no-param-reassign */
/* eslint-disable dot-notation */
/* eslint-disable camelcase */
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';
import { Field, FieldArray, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { RpcOptions, UnaryCall } from '@protobuf-ts/runtime-rpc';
import { AuthServiceClient } from '../../../../api/authpb/v1/auth.client';
import { Button } from '../../../../components/Button';
import { Card } from '../../../../components/Card';
import { getQueryParam } from '../../../../constants';
import CardSubtitle from '../CardSubtitle';
import CardTitle from '../CardTitle';
import OTPInput from './OTPInput';
import { Toast } from '../../../../components/Toast';

const CODE_LENGTH = [1, 2, 3, 4, 5, 6];
type FormValues = {
  codes: string[];
};

export function OTPCodeCard() {
  const [countDown, setCountDown] = useState(+(localStorage.getItem('countDown') || 59));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
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
  const transport = new GrpcWebFetchTransport({
    baseUrl: import.meta.env.VITE_BASE_URL
  });
  const onCodeSubmit = (values: FormValues) => {
    setIsLoading(true);
    if (!values.codes.includes('')) {
      const authService = new AuthServiceClient(transport);
      if (getQueryParam('inputType') === 'email') {
        authService
          .verifyEmailCode({ email: '', code: values.codes.join('') })
          .then(({ response }) => {
            console.log({ response });
            localStorage.setItem('accessToken', response?.accessToken);
            setError(false);
            if (response?.maskedPhoneNumber) {
              navigate('/home', { replace: true });
            } else {
              navigate('/signup');
            }
          })
          .catch((err) => {
            console.log({ err });

            setIsLoading(false);
            setError(true);
          });
      } else if (getQueryParam('inputType') === 'phone') {
        const options: RpcOptions = {
          interceptors: [
            {
              // adds auth header to unary requests
              interceptUnary(next, method, input, optionsX: RpcOptions): UnaryCall {
                if (!optionsX.meta) {
                  // eslint-disable-next-line no-param-reassign
                  optionsX.meta = {};
                }
                optionsX.meta['Authorization'] = localStorage.getItem('accessToken');
                return next(method, input, optionsX);
              }
            }
          ]
        };
        authService
          .verifySMSCode(
            {
              phoneNumber: getQueryParam('phoneNumber') || '',
              code: values?.codes?.join('')
            },
            options
          )
          .then(() => {
            setIsLoading(false);
            setError(false);
            navigate('/home');
          })
          .catch(() => {
            setIsLoading(false);
            setError(true);
          });
      }
    }
  };
  const subTitle = `A 6 digit OTP Code has been send to your ${getQueryParam(
    'inputType'
  )} given by you`;
  return (
    <Card>
      <CardTitle>OTP Code</CardTitle>
      <CardSubtitle>{subTitle}</CardSubtitle>
      <Formik
        initialValues={{ codes: ['', '', '', '', '', ''] }}
        onSubmit={onCodeSubmit}
        render={() => (
          <Form>
            <FieldArray
              name="codes"
              render={() => (
                <div className="flex justify-between w-[70%] mx-[15%] my-[3rem]">
                  {CODE_LENGTH?.map((code, index) => (
                    <div key={`${code + index}`} className="w-[20px]">
                      <Field name={`codes.${index}`}>
                        {({ field, form: { touched, errors } }: any) => (
                          <>
                            <OTPInput id={code.toString()} placeholder="0" field={field} />
                            <span className="text-error text-xs pt-2">
                              {errors.emailOrPhone && touched.emailOrPhone ? (
                                <div>{errors.emailOrPhone}</div>
                              ) : null}
                            </span>
                          </>
                        )}
                      </Field>
                    </div>
                  ))}
                </div>
              )}
            />
            <p className="text-center text-[15px] text-accent font-normal leading-[11px]">
              <button
                type="button"
                className={`${countDown > 1 ? 'pointer-events-none disabled' : 'cursor-pointer'}`}
                onClick={() => {
                  setCountDown(59);
                  localStorage.setItem('countDown', '59');
                }}
              >
                Resend OTP
              </button>{' '}
              {countDown ? (
                <span className="text-primary font-normal leading-[14px]">({countDown}s)</span>
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
      {error ? <Toast message="OTP is not valid" /> : null}
    </Card>
  );
}
