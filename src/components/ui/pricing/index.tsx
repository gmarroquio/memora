import { Camera, Film, QrCode, User, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";
import Link from "next/link";
import { Button } from "../button";

const TabGuestTrigger: React.FC<{ guest: number }> = ({ guest }) => {
  return (
    <TabsTrigger value={`${guest}`} className="w-full">
      {guest} <span className="hidden sm:block">convidados</span>
    </TabsTrigger>
  );
};

const TabGuestContent: React.FC<{
  guest: number;
  price: number;
}> = ({ guest, price }) => {
  return (
    <>
      <TabsContent value={`${guest}`}>
        <div className="flex items-center justify-between text-md">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <div>Até {guest} convidados</div>
          </div>
          <div>R${price}</div>
        </div>
        <div className="flex items-center space-x-2">
          <Camera className="w-4 h-4" />
          <div>27 fotos por convidado</div>
        </div>
        <div className="flex items-center space-x-2">
          <Film className="w-4 h-4" />
          <div>Fotos com efeito de camera analógica</div>
        </div>
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4" />
          <div>Veja sua festa como seus convidados</div>
        </div>
        <div className="flex items-center space-x-2">
          <QrCode className="w-4 h-4" />
          <div>Convite personalizado para o seu album</div>
        </div>
      </TabsContent>
    </>
  );
};

export const Guest = () => {
  return (
    <>
      <Tabs defaultValue="10" className="mx-auto max-w-2xl space-y-2">
        <TabsList className="w-full justify-between">
          <TabGuestTrigger guest={10} />
          <TabGuestTrigger guest={25} />
          <TabGuestTrigger guest={50} />
          <TabGuestTrigger guest={100} />
          <TabGuestTrigger guest={150} />
        </TabsList>
        <div className="px-1 py-2 border-t border-gray-50/50">
          <TabGuestContent guest={10} price={9.99} />
          <TabGuestContent guest={25} price={19.99} />
          <TabGuestContent guest={50} price={39.99} />
          <TabGuestContent guest={100} price={69.99} />
          <TabGuestContent guest={150} price={99.99} />
        </div>
      </Tabs>
      <Link prefetch className="mx-auto" href={`/login`}>
        <Button className="mt-8 bg-primary w-lg hover:bg-primary/90">
          Criar album
        </Button>
      </Link>
    </>
  );
};
