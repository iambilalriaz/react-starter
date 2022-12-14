import { Field, FieldArray, Form, Formik } from 'formik';
import React, { Dispatch, useEffect, useState } from 'react';
import { Button } from '../../../../components/Button';
import { Card } from '../../../../components/Card';
import CardSubtitle from '../CardSubtitle';
import CardTitle from '../CardTitle';
import OTPInput from './OTPInput';

const CODE_LENGTH = [1, 2, 3, 4, 5, 6];
export function OTPCodeCard({
  setActivePageIdx
}: {
  setActivePageIdx: Dispatch<React.SetStateAction<number>>;
}) {
  const [countDown, setCountDown] = useState(59);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (countDown >= 1) {
        setCountDown((prevCount) => prevCount - 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [countDown]);
  return (
    <Card>
      <CardTitle>OTP Code</CardTitle>
      <CardSubtitle>A 6 digit OTP Code has been send to your email given by you</CardSubtitle>

      <Formik
        initialValues={{ codes: ['', '', '', '', '', ''] }}
        onSubmit={() => {
          setActivePageIdx((prevIdx: number) => prevIdx + 1);
        }}
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
            <p className="cursor-pointer text-center text-[15px] text-accent font-normal leading-[11px]">
              Resend OTP{' '}
              {countDown ? (
                <span className="text-primary font-normal leading-[14px]">({countDown}s)</span>
              ) : null}
            </p>
            <div className="mt-16">
              <Button type="submit" size="lg">
                Done
              </Button>
            </div>
          </Form>
        )}
      />
    </Card>
  );
}
