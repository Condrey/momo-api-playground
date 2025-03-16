import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SessionProvider } from "next-auth/react";
import { AppSideBar } from "./(side-bar)/app-side-bar";

export default async function Layout({children}:{children:React.ReactNode}){
    return (
            <SidebarProvider>
                <AppSideBar/>
                <SidebarInset>{children}</SidebarInset>
            </SidebarProvider>
    )
}