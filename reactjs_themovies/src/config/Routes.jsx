import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Detail from "../pages/detail/Detail";
import Blog from "../pages/Blog";
import BlogDetail from "../pages/Blog/BlogDetail";
import CreateBlog from "../pages/CreateBlog/CreateBlog";

const Routes = () => {
  return (
    <Switch>
      <Route path="/blog" exact component={Blog} />
      <Route path="/create_blog" exact component={CreateBlog} />
      <Route path="/update_blog/:blogId" exact component={CreateBlog} />
      <Route path="/detail_blog/:id" exact component={BlogDetail} />
      <Route path="/:category/search/:keyword" component={Catalog} />
      <Route path="/:category/:id" component={Detail} />
      <Route path="/:category" component={Catalog} />

      <Route path="/" exact component={Home} />
    </Switch>
  );
};

export default Routes;
