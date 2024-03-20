import { configureStore } from "@reduxjs/toolkit";
import { sliceUser } from "./userSlice";


//exportation des actions

export const {initUser , resetUser} = sliceUser.actions ;

//exportation du store
export const store = configureStore({
    reducer:{

        user : sliceUser.reducer ,
    }

})