import React from "react";
import { Review } from "../../types/shared";

import { Card, Button, Avatar } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface ReviewListProps {
  reviews: Review[];
  onEdit: (id?: number) => void;
  onDelete: (id?: number) => void;
}

const RocketsList: React.FC<ReviewListProps> = ({
  reviews,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="reviews-container">
      {reviews.map((review) => (
        <Card
          key={review.id}
          title={review.title}
          extra={
            <>
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => onEdit(review?.id)}
              />
              <Button
                type="text"
                icon={<DeleteOutlined />}
                onClick={() => onDelete(review?.id)}
              />
            </>
          }
        >
          <p>Rocket Name: {review.rocketName}</p>
          <p>Description: {review.description}</p>
          {review.githubUsername && (
            <div>
              <Avatar
                src={`https://github.com/${review.githubUsername}.png`}
                size="small"
              />
              <a
                href={`https://github.com/${review.githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {review.githubUsername}
              </a>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

export default RocketsList;
