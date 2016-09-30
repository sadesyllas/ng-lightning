@NgModule({
  imports: [
    ...,
    NglModule.forRoot({
      svgPath: '/my/path', // Override this specific property
      ...
    })
  ],
})
export class AppModule {}
