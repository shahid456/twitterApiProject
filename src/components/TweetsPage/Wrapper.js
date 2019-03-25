import React from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import TweetFormat from "../TweetFormat";
import UserFormat from "../UserFormat";

export default function TweetsWrapper({
  hasNextPage,
  isNextPageLoading,
  items,
  loadNextPage,
  Page,
  itemSize
}) {
  const itemsCount = hasNextPage ? items.length + 1 : items.length;
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;
  const isItemLoaded = index => !hasNextPage || index < items.length;
  const Item = ({ index, style }) => {
    let content;
    if (!isItemLoaded(index)) {
      content = "Loading...";
    } else {
      content = items[index];
      if (Page == "Tweets") {
        return <TweetFormat style={style} status={content} />;
      }
      return <UserFormat style={style} user={content} />;
    }
    return (
      <div style={style} className="textAlign">
        {content}
      </div>
    );
  };

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemsCount}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        <List
          className="List"
          height={520}
          itemCount={itemsCount}
          itemSize={itemSize}
          onItemsRendered={onItemsRendered}
          ref={ref}
          width="100%"
        >
          {Item}
        </List>
      )}
    </InfiniteLoader>
  );
}
