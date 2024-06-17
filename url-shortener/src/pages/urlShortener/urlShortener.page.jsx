import React from "react";
import { Formik, Form, Field } from "formik";
import { Grid, Button } from "@mui/material";
import * as Yup from "yup";
import apiClient from "../../api/api";

const URLValidationSchema = Yup.object().shape({
  URL: Yup.string().url("Invalid URL").required("URL is required"),
});

const handleGenerateURL = async (values, { setSubmitting, setStatus }) => {
  try {
    const client = await apiClient();
    const response = await client.insertURL("/generate-url", {
      originalUrl: values.URL,
    });

    // Handle successful response (replace with your actual logic)
    console.log("Short URL:", response); // Log the short URL
    setStatus({
      success: true,
      message: "Short URL generated successfully!",
      data: response,
    });
  } catch (error) {
    console.error("Error generating short URL:", error);
    setStatus({
      success: false,
      message: "An error occurred. Please try again.",
      data: null,
    });
  } finally {
    setSubmitting(false);
  }
};

const handleGenerateOriginalURL = async (
  values,
  { setStatus, setSubmitting }
) => {
  try {
    const client = await apiClient();
    console.log(values.shortenedURL);
    const response = await client.getURLByShortURLId(
      "/shortUrl",
      values.shortenedURL
    );

    // Handle successful response (replace with your actual logic)
    console.log("URL:", response); // Log the short URL
    setStatus({
      success: true,
      message: "Original URL generated successfully!",
      data: response,
    });
  } catch (error) {
    console.error("Error generating Original URL:", error);
    setStatus({
      success: false,
      message: "An error occurred. Please try again.",
      data: null,
    });
  } finally {
    setSubmitting(false);
  }
};

const URLShortener = () => (
  <div>
    <h1>URL Shortener</h1>
    <Formik
      initialValues={{ URL: "" }}
      validationSchema={URLValidationSchema}
      onSubmit={handleGenerateURL}
    >
      {({ touched, errors, isSubmitting, values, status }) => (
        <Form>
          <Grid style={{ display: "block", marginBottom: "1rem" }}>
            <label htmlFor="URL">Enter URL:</label>
            <Field type="text" name="URL" id="URL" />
            {touched.URL && !errors.URL && values.URL.length > 0 && (
              <div style={{ color: "green" }}>Valid URL</div>
            )}
            {touched.URL && errors.URL && values.URL.length > 0 && (
              <div style={{ color: "red" }}>Invalid URL</div>
            )}
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            Generate Short URL
          </Button>
          {status && (
            <div
              style={{
                marginTop: "1rem",
                color: status.success ? "green" : "red",
              }}
            >
              {status.message}
              <br />
              <div
                style={{
                  marginTop: "1rem",
                  color: "orange",
                }}
              >
                {"ShortURL - " + status?.data?.shortUrl}
              </div>
            </div>
          )}
          <Grid></Grid>
        </Form>
      )}
    </Formik>
    <>
      <h1>Generate Original URL</h1>
      <Formik
        initialValues={{ shortenedURL: "" }}
        onSubmit={handleGenerateOriginalURL}
      >
        {({ isSubmitting, values, status }) => (
          <Form>
            <Grid style={{ display: "block", marginBottom: "1rem" }}>
              <label htmlFor="shortenedURL">Enter Shortened URL Code:</label>
              <Field type="text" name="shortenedURL" id="shortenedURL" />
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              Generate Original URL
            </Button>
            {status && (
              <div
                style={{
                  marginTop: "1rem",
                  color: status.success ? "green" : "red",
                }}
              >
                {status.message}
                <br />
                <div
                  style={{
                    marginTop: "1rem",
                    color: "orange",
                  }}
                >
                  {"URL - " + status?.data?.originalUrl}
                </div>
              </div>
            )}
            <Grid></Grid>
          </Form>
        )}
      </Formik>
    </>
  </div>
);

export default URLShortener;
