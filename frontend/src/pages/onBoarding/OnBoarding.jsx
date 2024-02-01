import React, { useState } from "react";
import { OnBoardingItem } from "./OnBoardingItem";
import "./OnBoarding.css";
import Button from "components/Button/Button";
import notebook from "utils/icons/undraw_undraw_notebook_ask4_duaf.svg";
import account from "utils/icons/undraw_access_account_re_8spm.svg";
import congratulations from "utils/icons/undraw_super_woman_dv-0-y.svg";
import { useNavigate } from "react-router-dom";

const items = [
  {
    title: "Welcome",
    description:
      "Welcome to Task Master, your own Todo application! This tool is designed to help you organize and manage your tasks efficiently. Let's get started with a quick overview of what you can do:",
    bullets: [
      {
        bullet: "View Analytics",
        description:
          "Keep track of your productivity by checking analytics on completed and pending tasks",
      },
      {
        bullet: "Manage Tasks",
        description: "Easily create, delete, and update tasks as needed",
      },
      {
        bullet: "Title, Description, Due Date, and Priority",
        description:
          "Customize your tasks by adding titles, descriptions, due dates, and priorities",
      },
      {
        bullet: "Mark as Completed or Pending",
        description:
          "Keep your tasks organized by marking them as completed or pending.",
      },
      {
        bullet: "Sorting Options",
        description:
          "Sort your todo list based on the latest or earliest created date, due date, and priority.",
      },
      {
        bullet: "Filter Tasks",
        description:
          "Filter tasks based on due dates, such as tasks due today or tomorrow.",
      },
    ],
    icon: notebook,
  },
  {
    title: "User Account Features",
    bullets: [
      {
        bullet: "Create an Account",
        description:
          "Sign up for a personalized experience. Create your account to access your tasks from anywhere.",
      },
      {
        bullet: "Login/Logout",
        description:
          "Securely log in and out of your account for seamless task management.",
      },
    ],
    description:
      "Great job on reaching this step! Let's explore some user account features:",
    icon: account,
  },
  {
    title: "You're All Set!",
    description:
      "Congratulations! You've completed the onboarding process for our Todo application. Now you're ready to take control of your tasks, boost your productivity, and stay organized.",
    icon: congratulations,
    bullets: [],
  },
];

export const OnBoarding = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= items.length) {
      newIndex = items.length - 1;
      navigate("/auth");
    }
    setActiveIndex(newIndex);
  };
  return (
    <div className="onBoardingContainer">
      <div className="carousel">
        <div
          className="inner"
          style={{ transform: `translate(-${activeIndex * 100}%)` }}
        >
          {items.map((item) => {
            return <OnBoardingItem item={item} width={"100%"} />;
          })}
        </div>
        <Button text={"Skip onboarding"} onClickEvent={() => navigate("/")} />

        <div className="carousel-buttons">
          <button
            className="button-arrow"
            onClick={() => {
              updateIndex(activeIndex - 1);
            }}
          >
            <span class="material-symbols-outlined">arrow_back_ios</span>{" "}
          </button>
          <div className="indicators">
            {items.map((item, index) => {
              return (
                <button
                  className="indicator-buttons"
                  onClick={() => {
                    updateIndex(index);
                  }}
                >
                  <span
                    className={`material-symbols-outlined ${
                      index === activeIndex
                        ? "indicator-symbol-active"
                        : "indicator-symbol"
                    }`}
                  >
                    radio_button_checked
                  </span>
                </button>
              );
            })}
          </div>
          <button
            className="button-arrow"
            onClick={() => {
              updateIndex(activeIndex + 1);
            }}
          >
            <span class="material-symbols-outlined">arrow_forward_ios</span>
          </button>
        </div>
      </div>
    </div>
  );
};
