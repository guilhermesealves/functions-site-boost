import { useState } from "react";
import { motion } from "framer-motion";
import { Settings as SettingsIcon, Store, Globe, CreditCard, Link2, Bell, Shield, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const Settings = () => {
  const [storeName, setStoreName] = useState("Minha Loja");
  const [domain, setDomain] = useState("minhaloja.codia.ai");
  const [notifications, setNotifications] = useState({
    sales: true,
    marketing: false,
    updates: true,
  });

  const handleSave = () => {
    toast.success("Configurações salvas com sucesso");
  };

  return (
    <div className="min-h-screen bg-background p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-foreground mb-2">Configurações</h1>
            <p className="text-muted-foreground">Gerencie as configurações da sua conta e loja</p>
          </div>
          <Button onClick={handleSave} className="gap-2 bg-primary hover:bg-primary/90">
            <Save className="w-4 h-4" />
            Salvar
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="store" className="space-y-6">
          <TabsList className="bg-card border border-border p-1">
            <TabsTrigger value="store" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Store className="w-4 h-4" />
              Loja
            </TabsTrigger>
            <TabsTrigger value="domain" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Globe className="w-4 h-4" />
              Domínio
            </TabsTrigger>
            <TabsTrigger value="payments" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <CreditCard className="w-4 h-4" />
              Pagamentos
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Bell className="w-4 h-4" />
              Notificações
            </TabsTrigger>
          </TabsList>

          {/* Store Settings */}
          <TabsContent value="store">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl border border-border bg-card space-y-6"
            >
              <div>
                <Label>Nome da Loja</Label>
                <Input 
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label>Email de Contato</Label>
                <Input 
                  type="email"
                  placeholder="contato@minhaloja.com"
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label>Telefone / WhatsApp</Label>
                <Input 
                  placeholder="+55 11 99999-9999"
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label>Endereço</Label>
                <Input 
                  placeholder="Rua, número, cidade, estado"
                  className="mt-1.5"
                />
              </div>
            </motion.div>
          </TabsContent>

          {/* Domain Settings */}
          <TabsContent value="domain">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl border border-border bg-card space-y-6"
            >
              <div>
                <Label>Subdomínio Codia</Label>
                <div className="flex items-center gap-2 mt-1.5">
                  <Input 
                    value={domain.replace(".codia.ai", "")}
                    onChange={(e) => setDomain(`${e.target.value}.codia.ai`)}
                    className="flex-1"
                  />
                  <span className="text-muted-foreground">.codia.ai</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-primary/20 bg-primary/5">
                <div className="flex items-center gap-3 mb-2">
                  <Link2 className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">Domínio Personalizado</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-primary/20 text-primary">Pro</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Conecte seu próprio domínio para uma experiência profissional
                </p>
                <Button variant="outline" className="mt-4 gap-2">
                  <Link2 className="w-4 h-4" />
                  Conectar Domínio
                </Button>
              </div>
            </motion.div>
          </TabsContent>

          {/* Payment Settings */}
          <TabsContent value="payments">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* PIX */}
              <div className="p-6 rounded-2xl border border-border bg-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-green-500/10">
                      <CreditCard className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">PIX</h4>
                      <p className="text-sm text-muted-foreground">Receba pagamentos instantâneos</p>
                    </div>
                  </div>
                  <Switch />
                </div>
                <div>
                  <Label>Chave PIX</Label>
                  <Input placeholder="CPF, CNPJ, email ou chave aleatória" className="mt-1.5" />
                </div>
              </div>

              {/* Stripe */}
              <div className="p-6 rounded-2xl border border-border bg-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-purple-500/10">
                      <CreditCard className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Stripe</h4>
                      <p className="text-sm text-muted-foreground">Cartões de crédito e débito</p>
                    </div>
                  </div>
                  <Switch />
                </div>
                <Button variant="outline" className="gap-2">
                  Conectar Stripe
                </Button>
              </div>
            </motion.div>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl border border-border bg-card space-y-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-foreground">Notificações de Vendas</h4>
                  <p className="text-sm text-muted-foreground">Receba alertas a cada nova venda</p>
                </div>
                <Switch 
                  checked={notifications.sales}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, sales: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-foreground">Marketing e Promoções</h4>
                  <p className="text-sm text-muted-foreground">Dicas e ofertas especiais</p>
                </div>
                <Switch 
                  checked={notifications.marketing}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, marketing: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-foreground">Atualizações do Produto</h4>
                  <p className="text-sm text-muted-foreground">Novos recursos e melhorias</p>
                </div>
                <Switch 
                  checked={notifications.updates}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, updates: checked })}
                />
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Settings;
