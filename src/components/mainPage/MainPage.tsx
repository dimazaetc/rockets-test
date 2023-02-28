import React, { useState } from "react";
import { Button, Form, message, Modal } from "antd";
import RocketForm from "../rocketForm";
import RocketsList from "../rocketsList";

import { Review } from "../../types/shared";

const initialReviews: Review[] = [
  {
    id: 1,
    title: "New rocket",
    rocketName: "Earth",
    description: "Nice rocket",
    githubUsername: "test",
  },
];
const MainPage = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review>({});
  const [form] = Form.useForm();

  const handleAdd = (newReview: Review) => {
    const review = reviews.find((r) => r.id === newReview.id);
    const newReviews: Review[] = reviews.filter((r) => r.id !== newReview?.id);
    if (review) {
      setReviews([...newReviews, newReview]);
      message.success("Review changed successfully");
    } else {
      setReviews([...reviews, newReview]);
      message.success("Review added successfully");
    }

    setModalVisible(false);
    setSelectedReview({});
  };

  const handleEdit = (id?: number) => {
    const review = reviews.find((r) => r.id === id);
    setModalVisible(true);
    if (review) {
      setSelectedReview(review);
      form.setFieldsValue(review);
    }
  };

  const handleDelete = (id?: number) => {
    setReviews(reviews.filter((r) => r.id !== id));
    message.success("Review deleted successfully");
  };

  const handleCancel = () => {
    setSelectedReview({});
    setModalVisible(false);
    form.resetFields();
  };

  return (
    <>
      <div className="App">
        <h1>List of Rockets</h1>
        <Button type="primary" onClick={() => setModalVisible(true)}>
          Add Review
        </Button>
        <Modal
          title={
            JSON.stringify(selectedReview) === "{}"
              ? "New Rocket"
              : "Edit Rocket"
          }
          open={modalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <RocketForm
            form={form}
            onSubmit={handleAdd}
            onCancel={handleCancel}
            selectedReview={selectedReview}
          />
        </Modal>
        <RocketsList
          reviews={reviews}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </>
  );
};

export default MainPage;
