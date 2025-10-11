import React from "react";

export default function ContactDetails({ data }) {
  // Default data structure if no data is passed
  const defaultData = {
    title: { main: "OUR", sub: "HIDEAWAY" },
    contacts: [
      
      {
        label: "Email",
        type: "email",
        value: "hello@realnet.com",
      },
      {
        label: "Phone",
        type: "phone",
        value: "+91 98241 82099",
      },
      {
        label: "Teams",
        type: "link",
        value: "https://teams.live.com/l/invite/FEAyRbepvsvnUG_8QE",
        text: "Talk to George",
      },
      {
        label: "Follow on",
        type: "social",
        links: [
          { name: "Dribbble", href: "https://dribbble.com/realnet" },
          { name: "LinkedIn", href: "http://www.linkedin.com/company/2715714" },
          { name: "Instagram", href: "https://www.instagram.com/realnet/" },
          { name: "Behance", href: "https://www.behance.net/realnet" },
          { name: "Facebook", href: "https://www.facebook.com/realnet/" },
        ],
      },
    ],
  };

  const {
    title = defaultData.title,
    contacts = defaultData.contacts,
  } = data || defaultData;

  return (
    <section className="w-full bg-white dark:bg-neutral-800 text-black dark:text-white py-20 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="mb-16 pt-8">
          <div className="text-left">
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight text-black dark:text-white">
              <span className="block lowercase">{title.main}</span>
              <span className="block lowercase">{title.sub}</span>
            </h3>
          </div>
        </div>

        {/* Contact Container */}
        <div className="space-y-12">
          {contacts.map((section, index) => (
            <div
              key={index}
              className="flex flex-col lg:flex-row lg:items-start lg:justify-between border-b border-gray-300 dark:border-gray-600 pb-8"
            >
              <div className="mb-4 lg:mb-0 lg:w-1/4">
                <h4 className="text-xl lg:text-2xl font-medium text-gray-600 dark:text-gray-300">
                  {section.label}
                </h4>
              </div>

              <div className="lg:w-3/4">
                <h4 className="text-2xl lg:text-3xl font-light leading-relaxed text-black dark:text-white">
                  {section.type === "text" && <div>{section.value}</div>}

                  {section.type === "email" && (
                    <a
                      className="text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 underline decoration-transparent hover:decoration-current"
                      href={`mailto:${section.value}`}
                    >
                      {section.value}
                    </a>
                  )}

                  {section.type === "phone" && (
                    <a
                      className="text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 underline decoration-transparent hover:decoration-current"
                      href={`tel:${section.value.replace(/\s+/g, "")}`}
                    >
                      {section.value}
                    </a>
                  )}

                  {section.type === "link" && (
                    <a
                      className="text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 underline decoration-transparent hover:decoration-current"
                      href={section.value}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {section.text}
                    </a>
                  )}

                  {section.type === "social" && (
                    <div className="flex flex-wrap items-center gap-2 lg:gap-4">
                      {section.links.map((link, i) => (
                        <React.Fragment key={i}>
                          {i > 0 && <span className="text-gray-500">·</span>}
                          <a
                            target="_blank"
                            href={link.href}
                            className="text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 underline decoration-transparent hover:decoration-current"
                            rel="noopener noreferrer"
                          >
                            {link.name}
                          </a>
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
