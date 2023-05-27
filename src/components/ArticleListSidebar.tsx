import { useEffect, useState } from "react";
import { tagsRequest, TagsInterface, DefaultResponseInterface } from "utils/api/default";

export default function ArticleListSidebar(): JSX.Element {
  const [tags, setTags] = useState<string[]>();
  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    const response: DefaultResponseInterface = await tagsRequest();
    if (response.ok) {
      const data: TagsInterface = JSON.parse(response.message);
      setTags(data.tags);
    }
  };
  return (
    <div className="sidebar">
      <p>Popular Tags</p>
      <div className="tag-list">
        {tags?.map(tag => (
          <a key={tag} href="" className="tag-pill tag-default">
            {tag}
          </a>
        ))}
      </div>
    </div>
  );
}
