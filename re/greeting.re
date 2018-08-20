open BsReactNative;

type state = {
    name: string
};

type action = | Change(string);

let component = ReasonReact.reducerComponent("Greeting");

let make = _children => {
  ...component,
  initialState: () => { name: "" },
  reducer: (action, state) =>
    switch (action) {
    | Change(text) => ReasonReact.Update({name: text})
    },
  render: self =>
    <View style=Style.(style([flex(1.), justifyContent(Center), alignItems(Center)]))>
    <Text style=Style.(style([fontWeight(`Bold)])) value="Reason is great!" />
    <TextInput style=Style.(style([
            height(Pt(40.)),
            width(Pt(200.)),  
            borderWidth(1.),
            marginTop(Pt(40.)),
            padding(Pt(10.))
          ]))
          onChangeText=((text) => self.send(Change(text)))
          placeholder="Username"
    />
    <Text style=Style.(style([marginTop(Pt(40.)), fontWeight(`Bold),]))> { ReasonReact.string("Hello " ++ self.state.name ++ " !!!") } </Text>
  </View>
};

let default = ReasonReact.wrapReasonForJs(~component, jsProps =>
    make([||])
);