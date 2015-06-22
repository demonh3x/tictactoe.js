describe("Instrumentation", function() {
  it("has the window object", function() {
    expect(window).toBeDefined();
  });

  it("has the document object", function() {
    expect(document).toBeDefined();
  });

  it("has jQuery", function() {
     expect(jQuery).toBeDefined();
     expect($).toBeDefined();
  });

  it("sees the creates html", function() {
    game.run();
    expect($('.foo').size()).toEqual(1);
  });
});
